# 1. Level One Header (Centered)

## 2. Level Two Header (Centered)

---

## 3. Image and Media Test

Here is a high-resolution image to test your custom `img` component styling (rounded corners, shadows, and captions):

![A beautiful landscape to test image rendering and captions](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80)

*The text above is the "Alt Text" and should appear as a caption below the image.*

---

## 4. Text Formatting Styles

This paragraph contains **Bold Text**, *Italic Text*, and ***Bold Italic Text***. 
We can also test ~~Strikethrough~~ and `Inline Code Snippets` within a sentence.

> **Blockquote Test:** This is a blockquote. It should have a distinct border on the left and perhaps a slightly different text color to stand out from the main body.

---

## 5. List Nesting & Tasks

**Task List (Requires remark-gfm):**

- [x] Finished the UI layout
- [x] Fixed the spacing issues
- [ ] Implement dark mode toggle

**Deeply Nested Unordered List:**

* Level 1

    * Level 2

        * Level 3
        
            * Level 4 (Check for indentation overlap)

---

## 6. Advanced Technical Content

### Syntax Highlighting (Python)

```python
import math

def calculate_orbit(radius):
    # This should be colored by highlight.js
    circumference = 2 * math.pi * radius
    return f"The orbit is {circumference} units."

print(calculate_orbit(500))