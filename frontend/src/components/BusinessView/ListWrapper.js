import { useSelector, useDispatch } from "react-redux";
import BusinessView from ".";

import { getBusinesses } from "../../store/business";

const ListWrapper = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => {
    return state.pokemon
  })

  return (
    <>
      <BusinessView />
    </>
  );
}

export default ListWrapper;