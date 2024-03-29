$(document).ready(function () {
    const valores = window.location.search
    const urlParams = new URLSearchParams(valores);

    var idusuario = urlParams.get('idu');
    console.log('idus: ' + idusuario)
    console.log("jQuery is working");
    $('#task-result').hide();
    fetchTask();

    function fetchTask() {
        console.log(idusuario);
        //enviar
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            data: {
                idusuario
            },
            success: function (response) {
                console.log(response)
                //parseamos la respuesta
                let tasks = JSON.parse(response);
                console.log(tasks)
                let templatesinempezar = '';
                let templateenproceso = '';
                let templatecompletada = '';
                //recogida 1 a 1
                tasks.forEach(task => {
                    console.log(task.idpuntosClave)
                    console.log(task.id)
                    if (task.estado == 'EN PROCESO') {

                        templateenproceso += `
                        <tr taskId= "${task.id}">
                            <td>${task.id}</td>
                            <td><a href="#" class="task-item">${task.name}</a></td>
                            <td>${task.description}</td>
                            <td>${task.estado}
                                <div class="progress"> 
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 65%"></div>
                                </div>
                            </td>
                            <td class="td-puntosclave" idpuntoclave = "${task.idpuntosClave}" onclick="fetchPC(${task.idpuntosClave});">Ver los puntos clave</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button class="show-cronometro btn btn-secondary"><a href="#">
                                    Cronómetro
                                </button>
                                
                            </td>
                            <td><button class="show-tempo btn btn-secondary"><a href="#">
                            Temporizador
                        </button></td>
                        </tr>
                    `
                    } else if (task.estado == 'TERMINADO') {
                        templatecompletada += `
                        <tr taskId= "${task.id}">
                            <td>${task.id}</td>
                            <td><a href="#" class="task-item">${task.name}</a></td>
                            <td>${task.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                            <td >
                                <button class="btn btn-success " style="background: #5CF951">${task.estado}</td></button>
                            
                                <td class="td-puntosclave" idpuntoclave = "${task.idpuntosClave}" hidden>Puntos clave</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `
                    } else {
                        templatesinempezar += `
                        <tr taskId= "${task.id}">
                            <td>${task.id}</td>
                            <td><a href="#" class="task-item">${task.name}</a></td>
                            <td>${task.description}</td>
                            <td>${task.estado}</td>
                            <td class="td-puntosclave" idpuntoclave = "${task.idpuntosClave}" onclick="">Ver los puntos clave</td>
                            <button class="task-delete btn btn-danger">
                                Delete
                            </button>
                            </td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button class="show-cronometro btn btn-secondary" ><a href="#">Cronómetro</a>
                                </button>
                                
                            </td>
                            <td><button class="show-tempo btn btn-secondary"><a href="#">
                            Temporizador
                        </button></td>
                        </tr>
                    `
                    }

                });
                $('#tasks-en-proceso').html(templateenproceso);
                $('#tasks-sin-empezar').html(templatesinempezar);
                $('#tasks-completed').html(templatecompletada)
            }
        });
        edit = false;
    }
    //boton enviar 
    $('#task-form').submit(e => {
        //objeto que guarde los valores de los inputs
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val(),
            estado: $('#estado').val(),
            idusuario: idusuario
        };

        console.log('postData: ----> ' + JSON.stringify(postData))
        console.log(edit)
        //definimos donde enviar en funcion de si es editar o añadir 
        let url;
        if (edit === false) {
            url = 'task-add.php';
        } else {
            url = 'task-edit.php';
        }

        console.log(url)
        console.log(postData)

        //enviar 
        $.post(url, postData, function (response) {
            console.log('resp: --->' + response)
            fetchTask();
            $('#task-form').trigger('reset');
            $('#estado').attr("hidden", true);
        })
        //evitar recarga
        e.preventDefault();
    });
    $(document).on('click', '.task-delete', function () {
        if (confirm('Are you sure you want to delete it?')) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');

            $.post('task-delete.php', {
                id
            }, function (response) {
                fetchTask();
            });
        }
    });

    $(document).on('click', '.show-cronometro', function () {
        abrirModalCronometro();
    })
    $(document).on('click', '.show-tempo', function () {
        abrirModalTemporizador();
    })

    function fetchPC(idpuntoclave) {
        console.log('id usuario: ' + idusuario);
        //enviar
        $.ajax({
            url: 'task-list-puntosclave.php',
            type: 'GET',
            data: {
                idpuntoclave
            },
            success: function (response) {
                console.log(response)
                let templatePC = '';
                if (response != '') {
                    list = document.getElementById('listadoPuntosClave');
                    puntosClaveArray = JSON.parse(response);
                    console.log(puntosClaveArray)
                    templatePC = puntosClaveArray.forEach(element => '<li id="'+element+'">'+element+'</li>');
                    
                } else {
                    templatePC = response;
                    
                }
                $('.listadoPuntosClave').html(templatePC);
            }
        })
    }
    $(document).on('click', '.td-puntosclave', function () {
        let element = $(this)[0];
        let id = $(element).attr('idpuntoclave');
        console.log(id)
        abrirModalPuntosClave();
        fetchPC(id);
    })
    $('#search').keyup(function (e) {

        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {
                    search
                },
                success: function (response) {
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                    ${task.name}
                    </li>`
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }

            });

        }
    });

    //mostrar datos para editar
    $(document).on('click', '.task-item', function () {
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php', {
            id: id
        }, function (response) {
            const task = JSON.parse(response);
            console.log(task)
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            $('#estado').val(task.estado);
            $('#estado').attr("hidden", false);
            edit = true;
        });
    });

    function abrirModalPuntosClave() {
        $('#modal_puntosclave').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#modal_puntosclave').modal('show');
    }

    function abrirModalCronometro() {
        $('#modal_cronometro').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#modal_cronometro').modal('show');
    }

    function abrirModalTemporizador() {
        $('#modal_temporizador').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#modal_temporizador').modal('show');
    }
    $(document).on('click', '.btnaddpuntoclave', function () {
        let element = $(this)[0].parentElement.parentElement;
        console.log(element)
        let listael = element.firstElementChild.firstElementChild;
        console.log(listael)
        let idpc = $(listael).attr('idpclave');
        console.log(idpc)
        nuevoitem = $('#addpuntoclave').val();
        console.log(nuevoitem)
        $.ajax({
            url: 'task-add-puntosclave.php',
            type: 'POST',
            data: {
                idpuntoclave: idpc,
                nuevoitem: nuevoitem,
                idusuario: idusuario
            },
            success: function (res) {
                console.log(res)
                element = ''
            }
        })
    })


    function getPuntosClave(idpuntoclave) {
        console.log(idpuntoclave)
        $.ajax({
            url: 'task-list-puntosclave.php',
            type: 'GET',
            data: {
                idpuntoclave
            },
            success: function (response) {
                console.log('res = ' + response)

                let templatePC = '';
                if (response != '') {
                    puntosClaveArray = JSON.parse(response);
                    console.log(puntosClaveArray)
                    templatePC = '<button class="btn btn-success" id="verpuntosclave" onclick="' + enviarPuntosClave(puntosClaveArray, idpuntoclave); + '">Ver puntos clave</button>';
                } else {
                    templatePC = '<button class="btn btn-primary" onclick="' + abrirModalPuntosClave(); + '">Añadir puntos clave</button>'
                }
                console.log(templatePC)
                $('.td-puntosclave').html(templatePC);
                return puntosClaveArray;

            }

        });

    }

    function enviarPuntosClave(array, idpuntoclave) {
        templateLista = '';
        array.forEach(puntoClave => {
            console.log(puntoClave);
            templateLista += '<li class="idPuntoClaveLista" idpclave="' + idpuntoclave + '"><a href="#" class="enlace-pcList-item" style="text-decoration:none;">' + puntoClave + '</a><button class="btn-eliminar-pc btn btn-danger">Eliminar</button></li>'
            $('#listadoPuntosClave').html(templateLista);
        })
    }

    function añdirPuntoClave(nuevoitem, idusuario, idpuntoclave) {
        $.ajax({
            url: 'task-add-puntosclave.php',
            type: 'GET',
            data: {
                nuevoitem,
                idusuario,
                idpuntoclave
            },
            success: function (resp) {
                console.log(resp)
            }
        })
    }
    $(document).on('click', '.btnaddpuntoclave', function () {
        nuevoitem = $('#addpuntoclave').val();
        let element = $(this)[0].parentElement;
        console.log(element)
        let idpuntoclave = element.getAttribute('idpclave');
        console.log(idpuntoclave)
        console.log(nuevoitem, idusuario)
        añdirPuntoClave(nuevoitem, idusuario, idpuntoclave)
    })
    $(document).on('click', '.btn-eliminar-pc', function () {

        idpc = jQuery(this.parentElement).attr("idpclave");

    })

    $(document).on('click', '.enlace-pcList-item', function () {
        let element = $(this)[0].parentElement;
        let idpuntoclave = element.getAttribute('idpclave');
        gpc = getPuntosClave(idpuntoclave);
        console.log(gpc)
        abrirModalPuntosClave()
    })

});