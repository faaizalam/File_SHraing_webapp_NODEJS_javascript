// // import axios from "axios"

// import axios from "axios";


// import axios from "axios";
// import { response } from "express";

// // filesx

// const filesx=async(e)=>{
//     // e.preventDefault()
//     // const dataform= document.getElementById('filex').value
//     // const dataform="hello"
//     // console.log(name)
//     // const b="best"
//     const file =e.target.files[0];
//       const dataform =new FormData();
//       dataform.append('image', file);
    
//       console.log(dataform)

//     // console.log(Array.from(bdy))
//     try {
//         // Axios.get(`/postman/products/${ProductId}`
//         // const response= await axios.post('/postman/upload', {dataform})
//         //    if (response.data) {
//         //     console.log(response.data)
            
//         //    }
//         const {data} = await axios.post('/postman/upload', dataform, {
//             headers:{
                
//                 'Content-Type':'multipart/form-data',
           

//             }
//         })
        
//         } catch (error) {
//             console.log(error.message)
            
        
//     }
    
    
    
    
    
    
// }
// // document.getElementById('sub').addEventListener('click',(e)=>{
//     //     e.preventDefault()
    
//     //     // const file=document.getElementById("file").value
//     //     // console.log(file)
    
    
//     // })
    
//     // import axios from "../node_modules/axios"
document.getElementById('file-upload').addEventListener('change',async(e)=>{
    e.preventDefault()
    const file=e.target.files[0]
    const formdata = new FormData();
    formdata.append('image',file);
    console.log(Array.from(formdata))

    // showloading()
    const response = await axios.post("/postman/upload",formdata,{

        headers:{
         
            'Content-Type':'multipart/form-data',
        },
    }
     
    
    )
    // hidloading()
    if (!response.data) {
        alert("error")
        
    }else{
        localStorage.setItem('files',response.data)
        alert('sucss')
        console.log(response.data)
        const main=document.getElementById('maingrid')
        const div= document.createElement('div')
          main.append(div)
        const image=document.createElement('img')
        image.src=response.data
        image.alt="Shared"
        div.append(image)
      const forms=document.getElementById('sub')
      const inp =document.createElement('input')
      inp.setAttribute('value',localStorage.getItem("files"))
      inp.type="text"
      inp.id="in"
      const button=document.createElement("button")
      button.type="button"
      button.id="finalbut"
      button.innerText="Submit"
      forms.append(inp,button) 
      
      
      
      
      
      // document.getElementById('image').value=data.image;
      document.getElementById("finalbut").addEventListener('click',finalss)
    }

})

 async function finalss (e) {
    e.preventDefault();
    console.log("h")
    const filen=document.getElementById("in").value
    // const filen="faaiz"
    console.log(`${filen}`)
    const response=await axios.post('/postman/mongosave',{filen})
    if (!response.data) {
        console.log("no")
        
    }else{
        console.log(response.data,"ok")
     const sub= document.getElementById('sub')
       const div=  document.createElement('div')
       sub.append(div)
       const a=  document.createElement('a')
        a.id="idss"
         a.href=`${response.data.Filelink}`
         a.innerText=`${response.data.Filelink}`
         div.append(a)
       
        
    }



    // const response =await axios.post('/mongosave')


    
    
}

// const Shareget=(async()=>{

// })
setTimeout(() => {
    
    const dd=(async()=>{
    
        const response =await axios.get('/postman/filemain')  
        console.log(response.data.Filelink)

        // document.getElementById(idss).href=response.data.Filelink
      const checkin=  document.getElementById('idss')
      const sub= document.getElementById('sub')
     const a= document.createElement('a')
       a.href=response.data.Filelink
       a.innerText=response.data.Filelink
        if(!checkin){
            sub.append(a)
            
            
        }
        



    })
    dd()
}, 1000);

