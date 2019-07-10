import ajax from './ajax'
const url = '/api'
export const reqsystemlogin = ({
  name,
  password
}) => {
  return ajax(url + '/system_login', {
    name,
    password
  }, 'post')
}
export const reqemlogin = ({
  name,
  password
}) => {
  return ajax(url + '/employ_login', {
    name,
    password
  }, 'post')
}
/*
 *
 *
 *
 */
export const reqaddemploy = ({
  youname,
  age,
  name,
  password,
  sex,
  address
}) => {
  return ajax(url + '/add_employ', {
    youname,
    age,
    name,
    password,
    sex,
    address
  }, 'post')
}
/*
 *
 *
 *
 *
 */
export const reqemploy = () => {
  return ajax(url + '/showemploy')
}

export const deletename = ({
  name
}) => {
  console.log('ajax')
  return ajax(url + '/delete', {
    name
  }, 'post')
}
export const postupdata = ({youname, age, name, sex, address}) => {
  return ajax(url + 'updata', {
    youname,
    age,
    name,
    sex,
    address
  }, 'post')
}
export const postjob = ({
    employname,
    workName,
    workNumber,
    cycleTime,
    jobPrice,
    mach,
    job: arr
  }) => {
  return ajax(url + '/get_cjdd', {
    employname,
    workName,
    workNumber,
    cycleTime,
    jobPrice,
    mach,
    job: arr
  }, 'post')
}
