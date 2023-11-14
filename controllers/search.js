// search for user only

const userSearch = async(req,res)=>{
    try {
        const searchQuery = req.query.q; // Get the search query from the request query parameters
    
        // Use Mongoose to perform a search in your database
        const results = await User.find({
          $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
            { lastName: { $regex: searchQuery, $options: 'i' } },
          ],
        });
    
        res.json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      
}
