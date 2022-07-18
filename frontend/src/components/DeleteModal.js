const DeleteModal = ({onCancel, onDelete}) => {
  return (
    <>
      Are you sure you want to delete this?
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}

export default DeleteModal;