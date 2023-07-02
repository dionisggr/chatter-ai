function snakeToCamelCase(obj) {
  const camelCaseObj = {};

  Object.keys(obj).forEach((key) => {
    const camelCaseKey = key.replace(/([-_][a-z])/g, (group) => {
      return group.toUpperCase().replace('-', '').replace('_', '')
    });

    camelCaseObj[camelCaseKey] = obj[key] || '';
  });

  return camelCaseObj;
}

function camelToSnakeCase(obj) {
  const snakeCaseObj = {};

  Object.keys(obj).forEach((key) => {
    const snakeCaseKey = key.replace(/([A-Z])/g, (group) => {
      return `_${group.toLowerCase()}`;
    });
    
    snakeCaseObj[snakeCaseKey] = obj[key] || '';
  });

  return snakeCaseObj;
}

function getFromLocalStorage(name) {
  const local = window.localStorage.getItem('chatter-ai');
  const parsed = local ? JSON.parse(local) : {};
  
  return parsed[name];
}

export default { snakeToCamelCase, camelToSnakeCase, getFromLocalStorage };
