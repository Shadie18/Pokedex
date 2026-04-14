import './cardsCss.css';

const CardGrid = ({ gridItems = null }) => {
  return (
    <section className="p-6 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
      {gridItems?.map((o) => o)}
    </section>
  );
};

export default CardGrid;
