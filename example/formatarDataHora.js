function formatarDataHora(data) {
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var hora = data.getHours();
    var minuto = data.getMinutes();

    // Garantindo que os números tenham dois dígitos
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    hora = hora < 10 ? '0' + hora : hora;
    minuto = minuto < 10 ? '0' + minuto : minuto;

    return ano + "-" + mes + "-" + dia + "T" + hora + ":" + minuto;
}
