
import {Schema, model, models} from 'mongoose';

const asteroidScoreSchema = new Schema({
  player_name:{
    type:String,
    required: true,
    default: 'AAA',
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const AsteroidScore = models.AsteroidScore || model('AsteroidScore', asteroidScoreSchema);

export default AsteroidScore;

// const prospectSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   store_name: {
//     type: String,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   }

// })

// const Prospect = models.Prospect || model('Prospect', prospectSchema);

// export default Prospect;