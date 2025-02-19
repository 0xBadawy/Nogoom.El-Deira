import mongoose from "mongoose";

const Schema = mongoose.Schema;

const typeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
 
);

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
        unique: [true, "Location already exists"],
    },
  },
  
);


const dealSchema = new Schema( 
    {
        name: {
        type: String,
        required: true,
            unique: [true, "Deal already exists"],
        },
    },
    
    );

const PropertyType = mongoose.model("propertyType", typeSchema);
const PropertyLocation = mongoose.model("propertyLocation", locationSchema);
const PropertyDeal = mongoose.model("propertyDeal", dealSchema);

export { PropertyType, PropertyLocation, PropertyDeal };
