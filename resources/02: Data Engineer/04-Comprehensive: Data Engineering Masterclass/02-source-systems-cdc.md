---
title: 02. Source Systems & CDC
description: Understanding source systems and implementing Change Data Capture (CDC).
authors: [TienPD]
---

# Source Systems & Change Data Capture (CDC)

This section details various source systems and how to ingest data from them effectively, with a focus on implementing a CDC pipeline.

## Source System Concepts

### Data Formats & Protocols
-   **File:** CSV, JSON, Parquet, Avro. Often found in FTP servers or Object Stores.
-   **OLTP (Online Transaction Processing):** Databases optimized for transactional workloads (Insert, Update, Delete). *Examples: PostgreSQL, MySQL, Oracle.*
-   **OLAP (Online Analytical Processing):** Databases optimized for complex analytical queries. *Examples: ClickHouse, Druid.*
-   **DVC (Data Version Control):** Version control for data and ML models, similar to Git for code.

### Messaging & Streaming Components
-   **Apache Kafka:** A distributed event streaming platform capable of handling trillions of events a day. Used for high-throughput, low-latency pipelines.
-   **RabbitMQ:** A message broker that implements the AMQP protocol. Good for complex routing logic.

## Change Data Capture (CDC)

CDC is a set of software design patterns used to determine and track the data that has changed so that action can be taken using the changed data.

### Implementation Guide: PostgreSQL to Kafka using Debezium

We will build a pipeline that captures changes from a PostgreSQL database and publishes them to a Kafka topic.

**Architecture:**
`Source (PostgreSQL) -> CDC Connector (Debezium) -> Kafka Connect -> Kafka Broker -> Consumer`

#### Prerequisites (Docker Compose Setup)

Create a `docker-compose.yaml` to spin up the necessary services.

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on: [zookeeper]
    ports: ["9092:9092"]
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  postgres:
    image: postgres:latest
    ports: ["5432:5432"]
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    command: ["postgres", "-c", "wal_level=logical"] # Important for CDC

  connect:
    image: confluentinc/cp-kafka-connect:latest
    depends_on: [kafka, postgres]
    ports: ["8083:8083"]
    environment:
      CONNECT_BOOTSTRAP_SERVERS: kafka:9092
      CONNECT_REST_PORT: 8083
      CONNECT_GROUP_ID: compose-connect-group
      CONNECT_CONFIG_STORAGE_TOPIC: docker-connect-configs
      CONNECT_OFFSET_STORAGE_TOPIC: docker-connect-offsets
      CONNECT_STATUS_STORAGE_TOPIC: docker-connect-status
      CONNECT_KEY_CONVERTER: org.apache.kafka.connect.json.JsonConverter
      CONNECT_VALUE_CONVERTER: org.apache.kafka.connect.json.JsonConverter
      CONNECT_INTERNAL_KEY_CONVERTER: "org.apache.kafka.connect.json.JsonConverter"
      CONNECT_INTERNAL_VALUE_CONVERTER: "org.apache.kafka.connect.json.JsonConverter"
      CONNECT_PLUGIN_PATH: "/usr/share/java,/usr/share/confluent-hub-components"
    # Note: You would normally need to install the debezium connector plugin here
    # command: 
    #   - bash 
    #   - -c 
    #   - |
    #     confluent-hub install --no-prompt debezium/debezium-connector-postgresql:latest
    #     /etc/confluent/docker/run
```

#### Step 1: Configure PostgreSQL
The PostgreSQL instance must use `wal_level=logical`. We set this in the docker command above.

#### Step 2: Create the Connector
Submit a JSON configuration to the Kafka Connect REST API to start the Debezium PostgreSQL connector.

**configuration.json:**
```json
{
  "name": "inventory-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "user",
    "database.password": "password",
    "database.dbname": "mydb",
    "topic.prefix": "dbserver1", 
    "table.include.list": "public.orders",
    "plugin.name": "pgoutput" 
  }
}
```

**Command to register connector:**
```bash
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" http://localhost:8083/connectors/ -d @configuration.json
```

#### Step 3: Verify Data Flow
1.  Insert a record into PostgreSQL:
    ```sql
    INSERT INTO orders (order_date, purchaser, quantity, product_id) VALUES ('2023-10-01', 1001, 2, 99);
    ```
2.  Consume from Kafka:
    ```bash
    # Inside the kafka container
    kafka-console-consumer --bootstrap-server kafka:9092 --topic dbserver1.public.orders --from-beginning
    ```
    You should see a JSON message representing the change event (Create), containing 'before' (null) and 'after' states.

### Building Data Flow into Database
To sink data from Kafka back into another database (e.g., for analytics), you would use a **JDBC Sink Connector** or a stream processor like **Flink** or **Spark Streaming** to write to the destination.
