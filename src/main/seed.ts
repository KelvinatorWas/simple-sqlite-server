
// WIP
const keys = Object.keys({});

const SqlDBTables = (dataTables:{[key:string]: { }}) => {
  let Tables = [];
  
  for (const key of keys) {
    const { tableName, sqlTableData, link } = dataTables[key];
    const datalink = [...link];

    let tableData = Object.entries(sqlTableData)
      .map(([column, definition]) => `${column} ${definition}`)
      .join(",\n \t");
    
    console.log(datalink.length)
    if (datalink.length) {
      console.log("SHOULD HAVE A LINK");
      const links = datalink.join(",\n \t");
      tableData += ", \n \t" + links; 
    }
  
    const dataTable = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
          ${tableData}
      )
    `;
    
    console.log(dataTable);

    Tables.push({name:tableName, data:dataTable})
  }

  return Tables
}