import{e as n,f as o}from"./app-C3YoAUYN.js";async function u(e){return await n.post("/api/usermanagement",e)}async function c(){return(await n.get("/api/usermanagement")).data.response}async function i(e,r){return(await n.put(`/api/usermanagement/${e}`,r)).data.response}async function l(e){return(await n.delete(`/api/usermanagement/${e}`)).data}function _(e){return async function(r){const t=await u(e);return r(a()),t}}function a(){return async function(e){try{const r=await c();console.log("Fetched users:",r),e(o.actions.setUsers(r))}catch(r){console.error("Error fetching users:",r)}}}function f(e,r){return async function(t){try{const s=await i(e,r);return console.log("User updated:",s),t(a()),s}catch(s){throw console.error("Error updating user:",s),s}}}function g(e){return async function(r){try{const t=await l(e);return console.log("User deleted:",t),r(a()),t}catch(t){throw console.error("Error deleting user:",t),t}}}export{_ as c,g as d,a as g,f as u};