
const mongoose = require('mongoose');
const Joi = require('joi');

const { Schema, Types } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  timetable: Types.Array
}, { timestamps: true });

const Course = mongoose.model('course', CourseSchema);

const CoursesJoiSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
});

module.default = Course;
module.exports.validate = (course) => Joi.validate(course, CoursesJoiSchema);
