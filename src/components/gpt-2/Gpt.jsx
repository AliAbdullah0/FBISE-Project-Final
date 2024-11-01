import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

function Gpt() {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [model, setModel] = useState(null);
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const runQna = async () => {
      try {
        setLoading(true);
        const loadedModel = await qna.load(); 
        setModel(loadedModel);
        console.log('Model Loaded!');
      } catch (error) {
        console.error('Error loading model:', error);
      } finally {
        setLoading(false); 
      }
    };

    runQna(); 
  }, []);

  const handleQuestionSubmit = async () => {
    if (model && context && question) {
      try {
        setLoading(true);
        const answers = await model.findAnswers(question, context);
        if (answers.length > 0) {
          setResponse(answers[0].text); 
        } else {
          setResponse('No answer found.');
        }
      } catch (error) {
        console.error('Error finding the answer:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResponse('Please provide a context and a question.');
    }
  };

  if (loading) {
    return (
      <div className='flex w-full items-center justify-center mt-3'>
        <img src="src/assets/loading.gif" alt="Loading..." className='h-7' />
      </div>
    );
  }

  if(!model){
    return <section className="flex items-center justify-center w-full min-h-svh">
    <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600">
                <span className="sr-only">Error Occured While Fetching Model</span>404
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600">Sorry, we couldn't find this page.</p>
            <p className="text-2xl md:text-3xl text-gray-600">Please Check Your Internet Connection :(</p>
            <Link to='/' className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200">Back to home</Link>
        </div>
    </div>
</section>
  }

  return (
    <div className='mt-5 space-y-3'>
      <h2 className="flex flex-row flex-nowrap items-center justify-center">
            <span class="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-gradient-to-r from-indigo-400 to-pink-600 ">
              QnA Model
            </span>
          </h2>
      <div className=' p-2 w-full flex items-center justify-center'>
        <textarea
          cols="50"
          rows="10"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder='Enter Context'
          className='border-2 border-gray-100 outline-none rounded-2xl w-1/2 h-1/2 p-3 shadow-sm focus:transition-all focus:shadow-lg focus:-translate-y-1'
        />
      </div>
      <div className='w-full p-2 flex flex-col items-center gap-2 '>
        <h2 className='font-semibold text-[3ch] mb-1 font'>Ask a Question!</h2>
        <div className='flex w-full items-center justify-center gap-2'>
        <input
          type="text"
          ref={inputRef}
          placeholder='Ask Question'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className='outline-none p-2 rounded-2xl min-w-[30%] border-2 border-indigo-400 bg-transparent w-1/5 shadow-sm focus:transition-all focus:shadow-lg focus:-translate-y-1'
        />
       <div class="flex justify-center">
              <a href="#" class="mr-5 inline-block rounded-xl bg-indigo-400 px-4 py-2 text-center font-semibold text-white md:mr-6" onClick={handleQuestionSubmit}>Find</a>
            </div>
        </div>
        {
          response &&
        <p className='bg-green-300 p-2 rounded'><span className='first-letter:capitalize'>{`Answer: ${response}`}</span></p>
        }
      </div>
      <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905b9f809b5c8180ce30c5_pattern-1.svg" alt="" class="absolute bottom-0 left-0 right-auto top-auto -z-10 inline-block md:bottom-1/2 md:left-0 md:right-auto md:top-auto" />
        <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905ba1538296b3f50a905e_pattern-2.svg" alt="" class="absolute bottom-auto left-auto right-0 top-0 -z-10 hidden sm:inline-block" />
        
    </div>
    
  );
}

export default Gpt;
