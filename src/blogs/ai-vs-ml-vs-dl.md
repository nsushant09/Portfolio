# Understanding the Hierarchy: AI vs. Machine Learning vs. Deep Learning

In the world of technology, terms like **Artificial Intelligence (AI)**, **Machine Learning (ML)**, and **Deep Learning (DL)** are often used interchangeably. However, they are not the same thing. To understand them properly, think of them as a set of Russian Nesting Dolls: AI is the largest doll, ML sits inside it, and DL is the smallest one nested inside ML.

![Fig: Hierarchy between AI, ML and DL](/assets/ai-vs-ml-vs-dl.png)

## Artificial Intelligence (AI): The Outer Circle

AI is a broad term. It refers to the concept of creating machines that can simulate human intelligence. This concept has been around since the 1950s. The systems at that time were termed **Symbolic AI (Expert Systems)**. In these systems, every rule was explicitly coded.

> **For Example:** A chess game where a computer plays against real users. An expert's knowledge was converted into thousands of hard-coded lines of "if-else" rules.

While these systems were great for problems like math or chess, they failed at "fuzzy" logic—tasks like recognizing if a photo contained a dog or a cat.

## Machine Learning (ML): The Search for Patterns

Machine Learning is a subset of AI that solved the "fuzzy logic" problem. Instead of writing rules, it uses statistical techniques to find patterns in data. Traditionally, a system was provided with **Rules and Data** to obtain an **Answer**. However, Machine Learning systems are provided with **Data and Answers** to obtain statistical equations, also known as **Rules**.

* **Feature Engineering:** In ML, humans often have to tell the machine what to look for. For example, to identify a dog, you might tell the algorithm to look for "pointed ears" or "fur texture."

Once these algorithms are fed a certain amount of data, or the data has a specific number of features (columns), they eventually plateau and stop getting "smarter."

## Deep Learning (DL): The Neural Frontier

Deep Learning is a specialized subset of Machine Learning inspired by the structure of the human brain (specifically neurons). Deep Learning provides significantly better results when dealing with **Big Data**.

### Why is it "Deep"?

It is called "Deep" because it uses multiple layers of artificial neurons. As you add more layers, the system's power to predict and understand complex data improves.

### The Key Advantage: Automatic Feature Extraction

Unlike standard ML, you don't need to tell a DL model what a dog's ear looks like. You simply feed it thousands of "raw" images, and the layers automatically figure out the features (edges, shapes, eyes, etc.) on their own.

> **Summary:** AI is the goal of making machines smart. ML is the statistical method used to reach that goal. DL is the advanced, multi-layered approach that allows machines to learn from raw data without human intervention.
