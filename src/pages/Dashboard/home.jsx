

const Home = () =>{
    return(
        <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">
            This is a customizable dashboard layout. Add your content here!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Card {item}</h2>
              <p className="text-gray-600">
                This is a sample card that you can customize with your own content.
              </p>
            </div>
          ))}
        </div>
      </div>
    )
}

export default Home;