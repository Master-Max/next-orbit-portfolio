
// import Prospect from "../../models/prospectModel";
// import connectMongo from "../../lib/connectMongo";

// export default async function handler(req, res) {
  
//   if(req.method !==  'POST'){
//     res.status(422).json({error: 'Error'})
//     return;
//   }

//   const data = req.body;

//   console.log(data)

//   const {email, store_name} = data;

//   if(!email){
//     res.status(422).json({error: 'Invalid Email'});
//     return;
//   }

//   console.log(`Attemping to Create Newletter: \n ${email}\n ${store_name}`)

//   await connectMongo();

//   const newProspect = await new Prospect({
//     email,
//     store_name
//   })
//   newProspect.save()

//   res.status(200).json({ result: JSON.stringify(newProspect), success: true })
//   return;
// }