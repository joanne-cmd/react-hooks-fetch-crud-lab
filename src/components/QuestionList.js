//import { json } from "msw/lib/types/context";
import React,{useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const[quizlet, setQuizlet]= useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then(quizlet=>setQuizlet(quizlet))

  }, [])
 function  veiwQuestion(id, correctIndex){
  fetch(`http://localhost:4000/questions/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"appliction/json"
    },
    body: JSON.stringify({correctIndex})
  })
  .then(r=>r.json())
  .then((updatedQuestion)=>{
    const updatedQuestions=quizlet.map((q) => {
          if(q.id=== updatedQuestion.id){
            return updatedQuestion
          }else{
            return q
          }
    })
    setQuizlet(updatedQuestions)
  } )

 }

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = quizlet.filter((q) => q.id !== id);
        setQuizlet(updatedQuestions);
      });
  }
   
 const mapquiz = quizlet.map((quiz)=>{
    return <QuestionItem  veiwQuestion={veiwQuestion} handleDelete={handleDelete} key={quiz.id} question={quiz}/>
   })


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
         {mapquiz}
      </ul>
    </section>
  );
}

export default QuestionList;
