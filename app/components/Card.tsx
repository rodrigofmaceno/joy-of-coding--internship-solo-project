interface CardProps {
  name: String;
  description: String;
  dueDate: String;
  category: String | null;
}

function Card({ name, description, dueDate, category }: CardProps) {
  return (
    <div className="flex-none inline-block bg-blue-50 p-3 w-96 h-96 mx-3 rounded-lg border-2 hover:bg-blue-100 border-blue-200">
      <h5 className="card-title border-b mb-3 py-2">{name}</h5>
      <div className="h-60 border-b mb-3 py-2 overflow-auto">
        <p className="h-full">{description}</p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Due on: {dueDate}</li>
        {category && <li className="py-1 list-group-item">Category: {category}</li>}
      </ul>
    </div>
  );
}

export default Card;
