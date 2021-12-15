const config = {

  screens: {
   
    people: {
      path: "people/:id",
      
    }
  },
};
  
  const linking = {
    prefixes: ["ugive2.com","ugive://"],
    config: config
  };
  
  export default linking;