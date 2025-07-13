import VenuesList from '../components/venue/VenuesList';

const Home = () => {
  return (
    <div>
      <div className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Book Your Perfect Venue</h1>
          <p className="text-xl">Find and book venues for your events</p>
        </div>
      </div>
      <VenuesList />
    </div>
  );
};

export default Home;
