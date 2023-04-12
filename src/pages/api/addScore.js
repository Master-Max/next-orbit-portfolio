import AsteroidScore from "../../models/asteroidScoreModel";
import connectMongo from "../../lib/connectMongo";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {

  await NextCors(req, res, {
    methods:['POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  
  if(req.method !==  'POST'){
    res.status(422).json({error: 'Error'})
    return;
  }

  try{
    const data = req.body;

    console.log(data)

    // const {email, store_name} = data;
    const {player_name, score} = data;

    // console.log(`Attemping to Create Newletter: \n ${email}\n ${store_name}`)
    console.log(`Attempting to Create Asteroid Score: \n ${player_name} \n ${score}`)

    await connectMongo();

    const newAsteroidScore = await new AsteroidScore({
      player_name,
      score,
    })
    newAsteroidScore.save()

    res.status(200).json({ result: JSON.stringify(newAsteroidScore), success: true })

  }catch(err){
    res.status(420).json({error: err})
  }
  
  return;
}