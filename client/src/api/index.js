import axios from "axios"
import {property} from '../../src/actions/index'
export const getproperty=async() =>{
    const res = await axios.get('http://localhost:5000/property/Property');
 return res.data
  }