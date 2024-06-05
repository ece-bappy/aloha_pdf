import fitz  # PyMuPDF
import os

def remove_images_from_pdf(input_pdf_path, output_pdf_path):
    # Open the input PDF
    pdf_document = fitz.open(input_pdf_path)
    
    # Iterate through each page
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        
        # Get all images on the page
        image_list = page.get_images(full=True)
        
        for img in image_list:
            xref = img[0]
            page.delete_image(xref)
    
    # Save the modified PDF to the output path
    pdf_document.save(output_pdf_path)

def process_all_pdfs_in_folder(input_folder, output_folder):
    # Ensure the output folder exists
    os.makedirs(output_folder, exist_ok=True)

    # Iterate over all PDF files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.pdf'):
            input_pdf_path = os.path.join(input_folder, filename)
            output_pdf_path = os.path.join(output_folder, filename)
            remove_images_from_pdf(input_pdf_path, output_pdf_path)
            print(f"Processed {filename}")

# Define the input and output folders
input_folder = 'pdf'
output_folder = 'outputPdf'

# Process all PDFs in the input folder
process_all_pdfs_in_folder(input_folder, output_folder)
