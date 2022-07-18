const DeleteModal = ({onCancel, onDelete}) => {
  return (
    <div className="deleteModal">
      <p>
        Are you sure you want to delete this?
      </p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default DeleteModal;