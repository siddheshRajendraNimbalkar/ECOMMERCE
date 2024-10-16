
import ProductCard from '../Card/Card';
import Blog from './Pages/Blog';
import Title from './Pages/Title';


const Home = () => {
  return (
    <div className="home-container scroll-smooth">
      <Title />
      <Blog />
      <div className="container mx-auto px-2">
        <div className="flex  flex-wrap  justify-center items-center sm:grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

      </div>
      </div>
    </div>
  );
};

export default Home;