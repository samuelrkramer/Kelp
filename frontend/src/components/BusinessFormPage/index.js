import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { createBusiness } from '../../store/business';


const BusinessFormPage = ({mode}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { businessId } = useParams();

  // placeholder until there's actual DB/store functionality for businesses
  const business = {};

  const [title, setTitle] = useState(business.title || "");
  const [description, setDescription] = useState(business.description || "");
  const [imgUrl, setImgUrl] = useState(business.imgUrl || "");
  const [address, setAddress] = useState(business.address || "");
  const [city, setCity] = useState(business.city || "");
  const [state, setState] = useState(business.state || "");
  const [zipCode, setZipCode] = useState(business.zipCode || "");
  const [lat, setLat] = useState(business.lat || "");
  const [lng, setLng] = useState(business.lng || "");
  const [errors, setErrors] = useState([]);

  const nums = (input) => input.replace(/\D/,'');
  const coords = (input) => input.replace(/[^\d\-\.NnSsEeWw\s]/,'');

  // const resetForm = () => {
  //   setTitle("");
  //   setDescription("");
  //   setImgUrl("");
  //   setAddress("");
  //   setCity("");
  //   setState("");
  //   setZipCode("");
  //   setLat("");
  //   setLng("");
  // }
  
  const handleSubmit = e => {
    e.preventDefault();
    alert("caught submit");
    setErrors([]);
    return dispatch(createBusiness(sessionUser, {
      title, description,
      imgUrl, address,
      city, state,
      zipCode, lat, lng
    }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      });
  }

  if (!sessionUser) return (
    <Redirect to="/login" />
  );

  return (
    <>
      <h1>{mode} a business</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            placeholder="http://example.com/image.jpg"
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <label>
          State
          <input
            type="text"
            name="state"
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </label>
        <label>
          Zip Code
          <input
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={e => setZipCode(nums(e.target.value))}
          />
        </label>
        <label>
          Latitude
          <input
            type="text"
            name="lat"
            value={lat}
            onChange={e => setLat(coords(e.target.value))}
          />
        </label>
        <label>
          Longitude
          <input
            type="text"
            name="lng"
            value={lng}
            onChange={e => setLng(coords(e.target.value))}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default BusinessFormPage;