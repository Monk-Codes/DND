import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import Card from "./Card";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Cards = () => {
 const [cards, setCards] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [newCardText, setNewCardText] = useState("");
 const [selectedColor, setSelectedColor] = useState("bg-amber-300");

 const colors = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-purple-300", "bg-amber-300"];

 // Load cards from localStorage when the component mounts
 useEffect(() => {
  const storedCards = JSON.parse(localStorage.getItem("cards"));
  if (storedCards) {
   setCards(storedCards);
  }
 }, []);

 // Function to save cards to localStorage
 const saveCardsToLocalStorage = (updatedCards) => {
  localStorage.setItem("cards", JSON.stringify(updatedCards));
 };

 const openModal = () => setIsModalOpen(true);

 const closeModal = () => {
  setIsModalOpen(false);
  setNewCardText("");
  setSelectedColor("bg-amber-300");
 };

 const handleAddCard = () => {
  if (newCardText.trim() === "") return;

  const newCard = {
   id: Date.now(),
   text: newCardText,
   backgroundColor: selectedColor,
   position: { x: 20 * cards.length, y: 20 * cards.length },
  };

  const updatedCards = [...cards, newCard];
  setCards(updatedCards);
  saveCardsToLocalStorage(updatedCards);
  closeModal();
 };

 const handleDeleteCard = (id) => {
  const updatedCards = cards.filter((card) => card.id !== id);
  setCards(updatedCards);
  saveCardsToLocalStorage(updatedCards);
 };

 const handleDragStop = (e, data, id) => {
  const updatedCards = cards.map((card) => {
   if (card.id === id) {
    return { ...card, position: { x: data.x, y: data.y } };
   }
   return card;
  });

  setCards(updatedCards);
  saveCardsToLocalStorage(updatedCards);
 };

 return (
  <div className="h-screen relative overflow-y-scroll no-scrollbar p-2">
   <h1 className="text-stone-500 font-Rampart text-3xl p-2 flex justify-center">Drag N Drop</h1>

   {cards.map((card) => (
    <Draggable key={card.id} position={card.position} onStop={(e, data) => handleDragStop(e, data, card.id)}>
     <div className="absolute cursor-grab">
      <Card text={card.text} backgroundColor={card.backgroundColor} onDelete={() => handleDeleteCard(card.id)} />
     </div>
    </Draggable>
   ))}

   <button onClick={openModal} className="fixed top-5 right-10 bg-white rounded-full p-1 shadow-lg hover:bg-blue-400 hover:scale-105">
    ➕
   </button>

   {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-80">
     <div className="bg-violet-400 flex flex-col rounded-2xl p-2 items-center gap-2">
      <ResizableBox width={400} height={350} minConstraints={[300, 200]} maxConstraints={[500, 500]} lockAspectRatio={true} className="bg-violet-500 p-4 rounded-lg shadow-lg">
       <h2 className="text-lg mb-2 p-1 underline shadow-xl hover:decoration-amber-500 hover:underline-offset-4">Add a New Card</h2>
       <textarea value={newCardText} onChange={(e) => setNewCardText(e.target.value)} className="w-full h-4/5 p-2 border-2 border-amber-400 bg-stone-200 rounded-md mb-4 outline-none resize-none overflow-y-scroll" placeholder="Enter text..." />
      </ResizableBox>

      <h3 className="text-sm font-semibold mb-2">Select a Background Color</h3>
      <div className="flex gap-2 mb-4 flex-wrap relative">
       {colors.map((color) => (
        <div key={color} className={`w-8 h-8 rounded-full cursor-pointer hover:scale-105 ${color} ${selectedColor === color ? "border-4 border-black" : ""}`} onClick={() => setSelectedColor(color)}></div>
       ))}

       <div className="flex justify-end">
        <button onClick={closeModal} className="mr-2 bg-gray-500 text-black rounded p-2 hover:invert">
         Cancel
        </button>
        <button onClick={handleAddCard} className="bg-blue-600 text-black font-semibold rounded p-2 hover:invert">
         Add Card
        </button>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default Cards;
