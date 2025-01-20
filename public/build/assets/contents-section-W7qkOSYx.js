import{d as f,e as x,r as m,u as g,j as t}from"./app-C3YoAUYN.js";import p from"./button-BZi__VSe.js";import w from"./modal-DogVpkXZ.js";import d from"./input-label-component-BTHVwU9u.js";import N from"./input-text-component-BdWWvd1C.js";import{I as F}from"./InputError-DGx8ryZl.js";import T from"./input-textarea-component-BYQ75Wek.js";import{F as _}from"./PlusIcon-D6938Yre.js";import{F as S}from"./XMarkIcon-D17UOICr.js";f("content/fetchContent",async(r,a)=>{try{return(await x.get(`/api/contents/${r}`)).data}catch(e){return a.rejectWithValue(e.response.data)}});const I=f("content/saveContent",async(r,a)=>{var e;try{return(await x.post("/api/contents",r,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(s){return a.rejectWithValue(((e=s.response)==null?void 0:e.data)||"An error occurred")}});function V(){const[r,a]=m.useState(!1),[e,s]=m.useState({title:"",content:"",file_path:null}),[l,u]=m.useState({}),j=g(),C=()=>a(!0),c=()=>{a(!1),s({title:"",content:"",file_path:null}),u({})},h=i=>{const{name:n,value:o}=i.target;s(b=>({...b,[n]:o}))},y=i=>{s(n=>({...n,file_path:i.target.files[0]}))},v=async i=>{i.preventDefault();const n=new FormData;n.append("title",e.title),n.append("content",e.content),e.file_path&&n.append("file_path",e.file_path);try{const o=await j(I(n)).unwrap();console.log("Content saved successfully:",o),c()}catch(o){console.error("Error saving content:",o),u(o||{})}};return t.jsxs("div",{children:[t.jsxs("div",{className:"mb-4 flex justify-between items-center",children:[t.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Contents"}),t.jsx(p,{type:"button",variant:"primary",size:"md",icon:t.jsx(_,{className:"h-5 w-5"}),onClick:C,children:"Add Content"})]}),t.jsxs(w,{isOpen:r,onClose:c,width:"w-1/4",children:[t.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Add New Content"}),t.jsxs("form",{onSubmit:v,children:[t.jsxs("div",{className:"mb-4",children:[t.jsx(d,{htmlFor:"title",labelText:"Title"}),t.jsx(N,{id:"title",name:"title",type:"text",required:!0,value:e.title,onChange:h})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx(d,{htmlFor:"content",labelText:"Content"}),t.jsx(T,{id:"content",name:"content",required:!0,value:e.content,onChange:h}),(l==null?void 0:l.content)&&t.jsx(F,{message:l.content,className:"mt-2"})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx(d,{htmlFor:"file_path",labelText:"Thumbnail"}),t.jsx("input",{id:"file_path",name:"file_path",type:"file",required:!0,onChange:y})]}),t.jsxs("div",{className:"flex justify-end gap-4",children:[t.jsx(p,{type:"submit",variant:"primary",size:"md",children:"Save"}),t.jsx(p,{type:"button",variant:"danger",size:"md",onClick:c,children:t.jsx(S,{className:"h-5 w-5"})})]})]})]})]})}export{V as default};