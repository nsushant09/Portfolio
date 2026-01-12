# Machine Learning Fundamentals

Machine Learning is the science and art of programming computers so they can learn from data. It is a field of study that gives comuters the ability to learn with being programmed or handled manually.

## Why do we use machine learning?

- For problems with many rules or that need a lot of manual work, ML can simplify the process, perform better, and adapt automatically when data changes.

- For problems without clear rules, ML can discover solutions that traditional methods can’t.

## Types of Machine Learning Systems

Machine learning system can be classified into different types based on various factors i.e.

- **Based on Supervision:** Whether the system is trained with human guidance or not, i.e., whether it is provided with desired outputs along with the data. Examples include Supervised, Unsupervised, Semi-supervised, and Reinforcement Learning.

- **Based on Learning Process:** Whether the system learns continuously from incoming data or in batches. This distinction is known as Online versus Batch Learning.

- **Based on Approach:** Whether the system compares individual data points or detects patterns from the training data. This is referred to as Instance-Based versus Model-Based Learning.

### Supervised Learning

The training data provided to the algorithm contains the desired output, also known as ***labels***

Two of the most common supervised learning task are:

1. Classification
2. Regression (Prediction)

> In both of these tasks, we typically provide data along with the desired outputs, allowing the algorithm to learn and then perform classification or prediction as required.

Some of the most common supervised learning algorithms are :

- k-Nearest Neighbors
- Linear Regression
- Logistic Regression
- Support Vector Machines (SVMs)
- Decision Tree and Random Forest
- Neural Networks

### Unsupervised Learning

Unliked supervised learning, the training data provided to the algorithm does not contains the desired output. The machine learning system does tries to learn on its own from the raw data.

Common unsupervised learning tasks and algorithms that help achieve these are:

1. Clustering

    A machine learning technique used to group similar data points into distinct categories or clusters.

    - K-Means Algorithm
    - DBSCAN
    - Hierarchical Clustering Analysis (HCA)

2. Anomaly and Novelty Detection
    Here, the system continuously learns to recognize normal or valid data, and based on this knowledge, it can identify whether new data is normal or unusual.

    *Novelty Detection* is a task similar to Anomaly Detection; however, the system is trained using only normal data.

    - One Class SVM
    - Isolation Forest

3. Visualization and Dimensionality Reduction

    In ***Visualization***, alot of unlabeled and complex data is provided, which outputs either a 2-D or a 3-D representation of provided data that can be easily plotted.

    ***Dimensionality Reduction*** is similar in comparision to visualization, whose main objective is simplify data without losing too much of information. This can be achieved using feature extraction

    *Feature Extraction* is a dimensionality reduction technique which combines multiple related features into one.

    - Principle Component Analysis (PCA)
    - Kernel PCA
    - Locally Linear Embedding (LLE)

4. Assosiation Rule Learning

    The main purpose of association rule learning is to discover interesting relationships between attributes by analyzing large amounts of data.

    - Apriori
    - Eclat

### Semi-Supervised Learning

Supervised Learning worked with labeled data. Unsupervised Learning worked with unlabeled data. Semi-Supervised data is a mix of these, i.e. the data would consist of partially labeled data.

### Reinforcement Learning

Reinforcement learning is a machine learning technique that involves an agent interacting with its environment. The agent performs various actions, observes the outcomes, and learns to make the best possible decisions through trial and error.

### Batch Learning

The system is first trained offline using all available data. Such a system is generally incapable of learning on the fly. Because it processes the entire dataset at once, it requires significant computational resources and time. Once deployed in production, the system simply applies what it has learned.

If the system needs to learn from new data, a completely new model must be trained on the updated dataset.

In some cases, the model can be updated continuously. For example, it can be configured to retrain on new data at regular intervals. However, this approach incurs considerable computational and financial costs.

### Online Learning

Online Learning is an improved version of Batch Learning, addressing its main limitation: the inability to learn on the fly.

In this approach, new data is divided into smaller chunks, which the system processes sequentially, incorporating the learned information into the model. This method requires comparatively fewer resources, and even very large datasets that cannot fit entirely into memory can be efficiently trained using online learning.

An important parameter in online learning is the *learning rate*, which determines how quickly the model adapts to changes in the data.

### Instance-Based Learning

This method is an approach to generalization. It uses a measure of similarity between labeled (trained) data and new examples. The system learns from the examples and generalizes to new cases by comparing them with the learned instances.

### Model-Based Learning

Model-Based Learning focuses on building a mathematical or algorithmic model that generalizes the patterns and relationships within the training data. This model is then used to make predictions on new, unseen data.

A model is trained using the entire dataset to learn the underlying patterns and relationships within the data. Once training is complete, predictions are made based on the learned knowledge without relying on the original training data. This approach enables faster predictions and is memory-efficient, as it does not require storing the full dataset. It is well suited for large datasets and complex problems. However, the model must be retrained when new data becomes available, and its accuracy depends heavily on the quality and representativeness of the training data.
