import mongoose from "mongoose";

export function checkRequiredFields(request, mongooseModel) {
  let req = request
  const schemaPaths = Object.keys(mongooseModel.schema.paths);
  const requiredFields = schemaPaths.filter(
    (path) => mongooseModel.schema.paths[path].isRequired
  );
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return false
    }
  }

  return true
}

export function missingFields(request, mongooseModel) {
  let req = request;
  const schemaPaths = Object.keys(mongooseModel.schema.paths);
  const requiredFields = schemaPaths.filter(
    (path) => mongooseModel.schema.paths[path].isRequired
  );
  let missing_fields = [];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      missing_fields.push(field);
    }
  }
  return missing_fields.length > 0 ? missing_fields : null;
}


export default checkRequiredFields
