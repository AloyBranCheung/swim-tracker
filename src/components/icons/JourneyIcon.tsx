import React from "react";
import Image from "next/image";

export default function JourneyIcon() {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDklEQVR4nO2a2y4DURSG1xWJvgIX2ooQ5xC8pEPxBI4ViTtCvIRDeAGhBwQhSFqf7MwqDTNNp9R0Tfrdz3S+rrXX7H9mRNq0CQ2QBrJAEXgEdoF+MSiR5yd3QI9YAVgnmO3fnHgYWAYugGei5aERgU4VeKd1uG9E4kgPfgHmgEmgS5oMsFFDJBv2ZEt6oJsao0276nCL/QbolnoBhoCSVmJMIgBPZgsouHWho7g77EkW9B+YE4sASWBVK+HYA1JiCSClZfyO69W0WAGvB4PYFCvgPyUqFMQK+LfVZ3uJFYDNuLRWEsj5SOQsTq6kjt+ySmTNSVQDnKjItFgGyKjIolgGb6/l2usVGJGYVOXStAxeHjlUGbf3WnRrBkiIUZlM1RT7a1xsPtfsM/QfQoNakTPgqUlS7yrUKdZwsRmYAuZ1sKDt3CFWAcY0ysZi7E9oZVzMHhTL4K1FuzHbAfQB+1Uj3+37kmJQouAzzfKmZIhR1C7GJWoXa4hcixXwnioGsS7GnqvlfCRyphZ7lUylMmWT47cCMKsix2IZYEVFFsIe2APs6JvTopY2kme9wDjwpnutgbAStwF301QEu9+rRqvhKhHEWtOu+uv3E8CMBqpKHjkInUe0nVqFkr5gCp8QW0DExeZTFah/TfiIuM8iglgVKwD9+lnEd66BXrEE3uTa1jeneX3HbfNu2kai5QNBL0zxPwtiuAAAAABJRU5ErkJggg=="
      width={24}
      height={24}
      alt="journey-icon"
    />
  );
}
