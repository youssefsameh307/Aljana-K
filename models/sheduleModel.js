import mongoose from 'mongoose';

const sheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String, // Change the type to Date
    required: true,
  },
}, {
  timestamps: true
});

const Shedule = mongoose.models.Shedule || mongoose.model('Shedule', sheduleSchema);

export default Shedule;
