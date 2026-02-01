---
title: 04. Batch Processing (Spark)
description: Batch processing concepts and Spark architecture development.
authors: [TienPD]
---

# Batch Processing & Apache Spark

Batch processing involves processing a large volume of data all at once. Apache Spark is the de-facto standard engine for this.

## Batch Processing Concepts
*   **Bounded Data:** Data is finite and has a clear start and end.
*   **Latency:** Minutes to Hours. High throughput is prioritized over low latency.
*   **Use Cases:** Daily reporting, Model training, Data migration, ETL.

## Apache Spark Architecture
Spark is a unified analytics engine for large-scale data processing.

### Key Components
1.  **Driver Program:** The process running the `main()` function of the application and creating the `SparkContext`.
2.  **Cluster Manager:** Allocates resources (Standalone, YARN, Mesos, Kubernetes).
3.  **Executors:** Processes running on worker nodes that execute tasks and store data.

### Core Structures
*   **RDD (Resilient Distributed Dataset):** The fundamental immutable collection of elements. Low-level, type-safe (Java/Scala).
*   **DataFrame:** Distributed collection of data organized into named columns. Optimized (Catalyst Optimizer).
*   **Dataset:** Type-safe extension of DataFrame (Scala/Java).
*   **SparkSQL:** Module for working with structured data using SQL queries.

### GCP Dataproc
A managed Spark and Hadoop service on Google Cloud. It allows you to create clusters quickly, run jobs, and shut them down to save costs.

## Developing a Spark Architecture

### Scenario
We need to process daily log files (TB scale), extract metrics, and save them to a data warehouse.

### Implementation Guide (PySpark)

**1. Initialize Spark Session**
Always the entry point.

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, window, desc

spark = SparkSession.builder \
    .appName("DailyLogProcessor") \
    .config("spark.executor.memory", "4g") \
    .config("spark.sql.shuffle.partitions", "200") \
    .getOrCreate()
```

**2. Optimize for Read (Schema Handling)**
Defining schema explicitly is faster than schema inference for large files.

```python
from pyspark.sql.types import StructType, StringType, IntegerType, TimestampType

schema = StructType() \
    .add("event_time", TimestampType()) \
    .add("event_type", StringType()) \
    .add("user_id", StringType()) \
    .add("value", IntegerType())

# Read CSV/Parquet
df = spark.read.schema(schema).parquet("s3a://my-bucket/logs/2023/10/01/")
```

**3. Transformations (Lazy Evaluation)**
Spark builds a DAG (Directed Acyclic Graph) and only executes when an Action is called.

```python
# Filter invalid events
clean_df = df.filter(col("value") >= 0)

# Aggregation: Sum value by event_type
result_df = clean_df.groupBy("event_type") \
    .agg({"value": "sum"}) \
    .withColumnRenamed("sum(value)", "total_value")
```

**4. Performance Tuning (Caching & Partitioning)**
If `clean_df` is used multiple times, cache it.

```python
clean_df.cache()
```

When writing, repartition to avoid creating too many small files or one giant file.

```python
# Write to Parquet, partitioned by event_type
result_df.repartition(10) \
    .write \
    .partitionBy("event_type") \
    .mode("overwrite") \
    .parquet("s3a://my-bucket/processed/daily_metrics/")
```

**5. Submit Job**
In production, use `spark-submit`.

```bash
spark-submit \
  --master yarn \
  --deploy-mode cluster \
  --num-executors 10 \
  --executor-memory 4G \
  --executor-cores 2 \
  daily_log_processor.py
```
