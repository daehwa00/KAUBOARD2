import axios from 'axios'
import {useState, useEffect} from 'react'
import address from "../../../address-info"

function SecondPage(){
  const [newsContent, setNewsContent] = useState([])

  useEffect(() => {
  axios.get(address.url + '/api/kaunews')
  .then(response=> {
    let div = document.createElement('div')
    div.innerHTML = response.data.result
    let contentData = div.querySelector('#resultBody')
    let titles = Array.from(contentData.querySelectorAll('tr td:nth-child(2)')).slice(0,3)
    const newsList = []
    Array.from(contentData.querySelectorAll('tr td:nth-child(4)')).slice(0,3).map((elem, index)=>{
      console.log(elem.querySelector('p').innerText)
      newsList.push({
        "src":elem.querySelector('p img').src.replace("localhost:3000", "old.kau.ac.kr"), 
      "content":elem.querySelector('p').innerText,
    "title" : titles[index].innerText})
      })
      setNewsContent(newsList)
  })
  },[])
    return (
    <div className="second">
      { newsContent.map((elem,idx)=>{
        console.log(elem)
      return (
      <div className="section" key={idx}>
        <div className="section-wrapper">
          <div className="vertical-wrapper">
            <div className="img-wrapper">
              <img src={elem["src"]}></img>
            </div>
            <div className="text-contents">
              <div className="title-wrapper">{elem["title"]}</div> 
              <div className="text-wrapper">{elem["content"]}</div>
            </div> 
          </div>
        </div>
      </div>)
    }) }
  </div>)
}

export default SecondPage