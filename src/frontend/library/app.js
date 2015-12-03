//external
// import $ from 'jquery';

//internal
import util from '~/src/frontend/library/util';

//render
const appInit = (document) => {
    //navs
    const navItems = $(`
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
                <strong class="navbar-brand">
                Aura Explorer
                <small>Statistics</small>
                </strong>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="index.html">Statistics</a></li>
                    <li><a href="controls.html">Controls</a></li>
                </ul>
            </div>
        </div>
    `).prependTo('#nav');



    //search box
    const searchForm = $(`
        <form class="navbar-form navbar-right">
            <input id="headerSearchBox" type="text" class="form-control" placeholder="Search...">
        </form>
    `)
    .submit((e) => {
        const keyword = $.trim( $(e.target).find('input').val() ).toLowerCase();
        location.href = util.getQueryUrl(`${keyword}`);
        return false;
    })
    .appendTo('#navbar')
        .find('input')
        .popover({
            trigger: 'focus',
            title: 'Matching Component',
            placement : 'bottom',
            content: "Most control names are of form <namespace>:<controlName>" 
        });




    //scroll to top
    const btnScrollToTop =$(`<button id="btnScrollToTop" class="btn btn-primary">^</button>`)
        .click(() => $(document).scrollTop(0))
        .appendTo('#navbar');
}


//export
export default appInit;