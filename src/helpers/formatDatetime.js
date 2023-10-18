const formatDatetime = (date) =>  {
    var year = date.getFullYear()
    var month = (1 + date.getMonth()).toString().padStart(2, '0')
    var day = date.getDate().toString().padStart(2, '0')

    var hours = date.getHours().toString().padStart(2, '0')
    var minutes = date.getMinutes().toString().padStart(2, '0')
    // var seconds = date.getSeconds().toString().padStart(2, '0')
    // var milliseconds = date.getMilliseconds().toString().padStart(3, '0')

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

export default formatDatetime