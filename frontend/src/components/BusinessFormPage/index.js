import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { fetchOneBusiness, createBusiness, editBusiness, deleteBusiness } from '../../store/business';


const BusinessFormPage = ({mode}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);

  let { businessId } = useParams();
  const oldBusiness = useSelector(state => state.business[businessId || 1])
  let business = {};
  
  if (mode === "Edit") {
    businessId = parseInt(businessId);
    // console.log("businessId", businessId, typeof(businessId))
    // placeholder until there's actual DB/store functionality for businesses
    // const business = {};
    business = {...oldBusiness};
  }

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

  const zip = (input) => input.replace(/\D/,'').slice(0,5);
  const coords = (input) => input.replace(/[^\d\-\.NnSsEeWw\s]/,'');
  const usState = (input) => input.replace(/[^a-zA-Z]/,'').slice(0,2)

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
  
  const handleSubmit = async e => {
    e.preventDefault();
    // alert("caught submit");
    setErrors([]);
    const newBusiness = {
      title, description,
      imgUrl, address,
      city, state,
      zipCode, lat, lng
    }
    try {
      let thunkResult;
      if (mode === "Create") {
        thunkResult = await dispatch(createBusiness( newBusiness ));
      }
      else if (mode === "Edit") {
        thunkResult = await dispatch(editBusiness( newBusiness, businessId ))
      }
      // console.log("thunkResult:", thunkResult);
      // const data = await thunkResult;
      // console.log("data:", data);
      history.push(`/business/${thunkResult.id}`);
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) setErrors(data.errors);
    }
    // const idk = await thunkResult.body;
    // const result = thunkResult.catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors)
    // });
    // console.log("BusinessForm thunkResult:", thunkResult);
    // console.log("idk:", idk)
  }

  const handleDelete = async e => {
    e.preventDefault();
    const result = await dispatch(deleteBusiness(businessId));
    // console.log("result",result);
    // console.log("await result:",await result);
    // if (result) {}
    setShowModal(false);
    history.push("/business");
    // }
  }

  // useEffect(() => {
  //   console.log("useEffect on BusinessForm fired")
  //   dispatch(fetchOneBusiness(businessId));
  //   console.log("... after dispatch, BusinessForm component")
  // }, [businessId, dispatch])

  if (!sessionUser) history.push("/login");

  return (
    <>
      <div className="contentBox">
        <h1>{mode} a business</h1>
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
              ))}
            </ul> 
          )}
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
              onChange={e => setState(usState(e.target.value))}
              />
          </label>
          <label>
            Zip Code
            <input
              type="text"
              name="zipCode"
              value={zipCode}
              onChange={e => setZipCode(zip(e.target.value))}
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
          <div className="underForm">
            <button type="submit">Submit</button>
            {mode === "Edit" && (
              <button onClick={() => setShowModal(true)}>Delete</button>
            )}
          </div>
        </form>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          Are you sure you want to delete this?
          <button onClick={() => setShowModal(false)}>Cancel</button>
          <button onClick={e => handleDelete(e)}>Delete</button>
        </Modal>
      )}
    </>
  );
};

export default BusinessFormPage;