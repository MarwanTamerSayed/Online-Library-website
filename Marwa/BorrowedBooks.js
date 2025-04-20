//function to remove a book
const buttons= document.getElementsByClassName("btn");
Array.from(buttons).forEach(button =>{  
  button.addEventListener("click", function() {
    
    const bookDiv = this.parentNode;
    bookDiv.remove(); 
  });
});
// function for overdue date
function overdue(){
const dueparagraphs = document.querySelectorAll(".due-date");
dueparagraphs.forEach(dueparagraph => {
const due_date = new Date(dueparagraph.getAttribute("data-due"));
const currentDate= new Date();
const bookdiv = dueparagraph.closest('.book');
console.log("Current Date:", currentDate);
    console.log("Due Date:", due_date);
  
  if (currentDate > due_date) {
    // If the book is overdue, style the book to be red
    bookdiv.style.border = "2px solid red";
  } else {
    // If the book is not overdue, style the book to be green
    bookdiv.style.border = "2px solid green";
  }});

}
window.onload = function() {
  overdue();  
}; 
 