import os

def read_and_store_files(output_file="merged_content.txt"):
    # Get all .html and .js files in the current directory
    files = [f for f in os.listdir() if f.endswith(".html") or f.endswith(".js")]
    
    with open(output_file, "w", encoding="utf-8") as out_file:
        for file in files:
            out_file.write(f"==== {file} ====" + "\n\n")  # Segmenting file names
            
            with open(file, "r", encoding="utf-8") as f:
                content = f.read()
                out_file.write(content + "\n\n")  # Adding content

    print(f"Content from .html and .js files has been saved to {output_file}")

# Run the function
read_and_store_files()
