$(document).ready(function () {
    var today = new Date();
    var startInput = document.getElementsByName('start')[0];
    var endInput = document.getElementsByName('end')[0];

    // Configurar a data e hora atual para o input de início
    startInput.value = today.getFullYear() + '-' +
        ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + today.getDate()).slice(-2) + 'T' +
        ('0' + today.getHours()).slice(-2) + ':' +
        ('0' + today.getMinutes()).slice(-2);

    // Configurar a data e hora para amanhã para o input de fim
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    endInput.value = tomorrow.getFullYear() + '-' +
        ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '-' +
        ('0' + tomorrow.getDate()).slice(-2) + 'T' +
        ('0' + today.getHours()).slice(-2) + ':' +
        ('0' + today.getMinutes()).slice(-2);

    $("#addButton").click(function () {
        // Obter os valores dos campos do formulário
        var idRecurso = $("input[name='id']").val();
        var nomeRecurso = $("input[name='recurso']").val();
        var dataInicio = new Date($("input[name='start']").val());
        var dataFim = new Date($("input[name='end']").val());

        // Verificar se o campo 'Id' está vazio ou não é um número
        if (idRecurso === "" || isNaN(idRecurso)) {
            alert("Por favor, preencha o campo 'Id' com um número válido.");
            $("input[name='id']").focus();
            return;
        }

        // Verificar se o número fornecido é menor que zero
        if (parseInt(idRecurso) < 0) {
            alert("Por favor, preencha o campo 'Id' com um número inteiro positivo válido.");
            $("input[name='id']").focus();
            return;
        }

        if (nomeRecurso === "") {
            alert("Por favor, preencha o campo 'Recurso'.");
            $("input[name='recurso']").focus();
            return;
        }

        if (dataInicio == "Invalid Date") {
            alert("Por favor, selecione a data de início.");
            $("input[name='start']").focus();
            return;
        }
        if (dataFim == "Invalid Date") {
            alert("Por favor, selecione a data de fim.");
            $("input[name='end']").focus();
            return;
        }

        // Verificar se a data final é maior que a data inicial
        var dataInicioObj = new Date(dataInicio);
        var dataFimObj = new Date(dataFim);
        if (dataFimObj <= dataInicioObj) {
            alert("A data de fim deve ser posterior à data de início.");
            $("input[name='end']").focus();
            return;
        }

        // Criar o novo item com os valores do formulário
        var novoItem = {
            id: idRecurso, // Incrementa o ID com base no comprimento atual do array
            name: nomeRecurso,
            series: [
                { name: "Planejado", start: dataInicio, end: dataFim },
                { name: "Real", start: new Date(dataInicio.getTime() + (24 * 60 * 60 * 1000)), end: new Date(dataFim.getTime() + (24 * 60 * 60 * 1000)), color: "#f0f0f0" }
            ]
        };

        // Adiciona o novo item ao final do array ganttData
        ganttData[idRecurso] = novoItem;

        // Limpa os campos do formulário após adicionar o novo item
        $("input[name='recurso']").val("");
        $("input[name='start']").val("");
        $("input[name='end']").val("");
        modal.style.display = "none";


        // Remova o gráfico Gantt existente antes de criar um novo
        $("#ganttChart").empty();

        // Inicialize um novo gráfico Gantt com os dados atualizados
        $("#ganttChart").ganttView({
            data: ganttData,
            slideWidth: 900,
            behavior: {
                onClick: function (data) {
                    var msg = "Você clicou em um evento: { start: " + data.start.toString("dd/MM/yyyy HH:mm") + ", end: " + data.end.toString("dd/MM/yyyy HH:mm") + " }";
                    $("#eventMessage").text(msg);
                },
                onResize: function (data) {
                    var msg = "Você redimensionou um evento: { start: " + data.start.toString("dd/MM/yyyy HH:mm") + ", end: " + data.end.toString("dd/MM/yyyy HH:mm") + " }";
                    $("#eventMessage").text(msg);
                },
                onDrag: function (data) {
                    var msg = "Você arrastou um evento: { start: " + data.start.toString("dd/MM/yyyy HH:mm") + ", end: " + data.end.toString("dd/MM/yyyy HH:mm") + " }";
                    $("#eventMessage").text(msg);
                }
            }
        });

    });
});
