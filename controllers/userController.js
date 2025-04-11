exports.getAllUsers = (req, res) => {
    res.json([{ id: 1, name: '阿蜜球' }]);
  };
  
  exports.getUserById = (req, res) => {
    const { id } = req.params;
    res.json({ id, name: '阿蜜球' });
  };
  