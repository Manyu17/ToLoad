//元素为对象的数组
var group;      //分组
var childGroup; //子分类
var todo;       //任务

//分组对象
function Group(id, name, child){
    this.id = id;
    this.name = name;
    this.child = child;
}
//分组初始实例
var group1 = new Group(0, "默认分类", []);
var group2 = new Group(1, "背包十年", [0,1,2,3]);
var initial_group = [group1, group2];

//子分类对象
function ChildGroup(id, name, father, child){
    this.id = id;
    this.name = name;
    this.father = father;
    this.child = child;
}
//子分类初始实例
var childGroup1 = new ChildGroup(0, "五十号公路", 1, [0]);
var childGroup2 = new ChildGroup(1, "明天在厦大相逢", 1, [1]);
var childGroup3 = new ChildGroup(2, "On The island", 1, [2,4]);
var childGroup4 = new ChildGroup(3, "单车上的吉他手", 1, [3]);
var initial_childGroup = [childGroup1, childGroup2, childGroup3, childGroup4];

//任务对象
function ToDo(id, name, father, finish, date, text){
    this.id = id;
    this.name = name;
    this.father = father;
    this.finish = finish;
    this.date = date;
    this.text = text;
}
//任务初始实例
var todo1 = new ToDo(0, "LincolnHYW", 0, true, "2015-05-01", "50号公路虽然被称为世界上最孤独的公路，但若你游走其间，发现这里绝不会是荒无人烟的存在。在这里你将回顾美国的发展历史，在这里你将感受印第安人的淳朴，在这里你将感受到最为纯粹的美式乡村文化。");
var todo2 = new ToDo(1, "沙坡尾", 1, true, "2015-05-10", "世间所有的相遇都是久别重逢 你是否也像我一样， 为生活。终日奔波。 你是否也像我一样， 曾经有的那些理想，念头。慢慢变得实际起来，以前觉得自己和别人不一样，我不会、也不要像他们一样，日复一日庸庸碌碌，忙着终老。不知从什么时候开始喜欢远行。 期待远方，期待着久违的相逢。 旅行是为了遇见另一个自己。 而人生的自由和无限可能性都是错觉。 每个人都被社会压力，亲近的人和自己束缚的死死的。 每天做着一定会去做的事情。 而，这不是我理想的。");
var todo3 = new ToDo(2, "艺术西区", 2, true, "2015-05-20", "记录黄昏时的逆光");
var todo4 = new ToDo(3, "草莓音乐节", 3, false, "2015-05-30", "14:30-15:10曾轶可——15:30-16:10 旅行团——16:30-17:10麦田守望者");
var todo5 = new ToDo(4, "不在书店", 2, false, "2015-06-10", "一间隐藏在幽静的老别墅区里的独立书店");
var initial_todo = [todo1, todo2, todo3, todo4, todo5];

//将数据转换为json对象并做本地存储
function save() {
    localStorage.group = JSON.stringify(group);
    localStorage.childGroup = JSON.stringify(childGroup);
    localStorage.todo = JSON.stringify(todo);
}

window.onload = function () {
    // 如果页面之前没被访问过，载入初始值
    if (!localStorage.getItem('group')) {
        localStorage.group = JSON.stringify(initial_group);
        localStorage.childGroup = JSON.stringify(initial_childGroup);
        localStorage.todo = JSON.stringify(initial_todo);
    }
    group = JSON.parse(localStorage.group);
    childGroup = JSON.parse(localStorage.childGroup);
    todo = JSON.parse(localStorage.todo);
    creatGroup();
    newGroup();
    newToDo();
}

//统计任务数量
function count () {
    var count = document.getElementById("count");
    count.innerHTML = " ("+ todo.length +")";

    var group_count = document.getElementsByClassName("group-count");
    var child_group_count = document.getElementsByClassName("child-group-count");

    for (var i = 0; i < group_count.length; i++) {
        var x = 0;
        for (var j = 0; j < group[i].child.length; j++) {
            x+= childGroup[group[i].child[j]].child.length;
        };
        group_count[i].innerHTML = " ("+ x +")";
    };

    for (var i = 0; i < child_group_count.length; i++) {
        child_group_count[i].innerHTML = " ("+ childGroup[i].child.length +")";
    };
}

//显示分组列表
function creatGroup () {
    var ul=document.getElementById("l-group");
    ul.innerHTML = "";  //每次调用函数先清空任务列表

    //显示父分组
    for (var i = 0; i < group.length; i++) {
        var li = document.createElement("li");
        var h2 = document.createElement("h2");
        var info = group[i].name;      
        var txt = document.createTextNode(info); 
        var span = document.createElement("span");
        
        h2.appendChild(txt);
        li.appendChild(h2);        
        ul.appendChild(li);
        h2.appendChild(span); 
        span.setAttribute("class", "group-count");
        li.setAttribute("class", "j-group");
        li.setAttribute("index", group[i].id);  //添加索引序号
        
        if(i!=0){           
            var del = document.createElement("span");
            h2.appendChild(del);           
            del.setAttribute("class", "del");
            del.setAttribute("onclick", "del(event, this)");
        }

        if(group[i].child.length!=0){
            var child_ul = document.createElement("ul");
            li.appendChild(child_ul);
        }

        //显示子分类
        for (var j = 0; j < childGroup.length; j++) {
            if(childGroup[j].father==group[i].id){
                var child_li = document.createElement("li");
                var child_info = childGroup[j].name;      
                var child_txt = document.createTextNode(child_info);
                var child_span = document.createElement("span");
                var del = document.createElement("span");
                child_li.appendChild(child_txt);
                child_ul.appendChild(child_li);
                child_li.appendChild(child_span);
                child_li.appendChild(del);
                child_li.setAttribute("class", "j-child-group");
                child_li.setAttribute("index", childGroup[j].id);   //添加索引序号
                child_span.setAttribute("class", "child-group-count");  
                del.setAttribute("class", "del");
                del.setAttribute("onclick", "del(event, this)");           
            }            
        }
    };
    creatToDo();
    count();
}

//显示创建新分组遮罩弹出层
function newGroup () {
    var add_group =  document.getElementById("add-group");
    var close = document.getElementsByClassName("pop-close")[0];
    var pop = document.getElementById("pop"); 
    var masklayer = document.getElementById("masklayer");
    var select=document.getElementById("pop-s-parent");
    select.innerHTML = '<option value="-1">无</option>';
    //将已有父分组添加到选项列表
    for (var i = 1; i < group.length; i++) {
        var option = document.createElement("option");
        var info = group[i].name;      
        var txt = document.createTextNode(info);              
        option.appendChild(txt);        
        select.appendChild(option);
        option.value = group[i].id;
    };
    add_group.onclick = function() {
        pop.style.display = "block";
        masklayer.style.display = "block";
    }
    close.onclick = function(){
        pop.style.display = "none";
        masklayer.style.display = "none";
    }
    addGroup();
}

//创建新分组
function addGroup(){
    var error = document.getElementById("pop-error");
    var button = document.getElementById("pop-confirm");
    button.onclick = function(){
        var name = document.getElementById("pop-group-name").value;
        var father_name = document.getElementById("pop-s-parent").value;
        if(name.length === 0){
            error.innerHTML = "不为空";
            return;
        }
        //选择“无”则为创建新的父分组
        if(father_name==="-1"){
            error.innerHTML = "";
            var new_group = new Group(group.length, name, []);
            group.push(new_group);
            save();
        }
        //创建子分类
        else{
            error.innerHTML = "";
            var new_childGroup = new ChildGroup(childGroup.length, name, father_name, []);
            group[father_name].child.push(childGroup.length);
            childGroup.push(new_childGroup);
            save();
        }
        creatGroup();
        newGroup();
        pop.style.display = "none";
        masklayer.style.display = "none";
    }  
}

//显示任务列表
function creatToDo () {
    var j_group = document.getElementsByClassName("j-group");
    var j_child_group = document.getElementsByClassName("j-child-group");
    for (var i = 0; i < j_child_group.length; i++) {
        j_child_group[i].onclick = function(){
            //移除上一次选中的子分类的id属性
            for (var k = 0; k < j_child_group.length; k++) {
                j_child_group[k].removeAttribute("id");
            };
            this.setAttribute("id","childGroup-selected");  //为选中的子分类添加id属性
            var id = this.getAttribute("index");            
            var list_wrapper = document.getElementById("list-wrapper");
            list_wrapper.innerHTML = "";
            for(var j=0, len=childGroup[id].child.length; j<len; j++){                
                var info = todo[childGroup[id].child[j]].name;
                var li = document.createElement("li");
                var txt = document.createTextNode(info);              
                li.appendChild(txt);        
                list_wrapper.appendChild(li);
                li.setAttribute("class", "j-todo");
                li.setAttribute("index", todo[childGroup[id].child[j]].id);

                var del = document.createElement("span");
                li.appendChild(del);           
                del.setAttribute("class", "del");
                del.setAttribute("onclick", "del(event, this)");

                showToDo();
            }
        }
    };
}

//创建新任务
function newToDo () {
    var show = document.getElementsByClassName("show");
    var edit = document.getElementsByClassName("edit");
    var add_task = document.getElementById("add-task");
    var cancel = document.getElementById("todo-cancel");
    var confirm = document.getElementById("todo-confirm");
    var error = document.getElementById("todo-error");
    //显示编辑框，隐藏现有任务内容
    add_task.onclick = function(){
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "none";
        };
        for (var i = 0; i < edit.length; i++) {
            edit[i].style.display = "inline";
        };
    }
    //取消编辑
    cancel.onclick = function() {
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "inline";
        };
        for (var i = 0; i < edit.length; i++) {
            edit[i].style.display = "none";
        };
        error.innerHTML = "";
    }
    //确认添加任务
    confirm.onclick = function(){
        var dateSplit = edit[1].value.split('-');
        if(edit[0].value=="" || edit[1].value=="" ||edit[2].value==""){
            error.innerHTML = "标题日期内容都不能为空！"
            return;
        }
        else if (!edit[1].value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            error.innerHTML = '任务日期格式错误！';
            return;
        }
        else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
            error.innerHTML = '这是火星时间咩？';
            return;
        }
                  
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "inline";
        };
        for (var i = 0; i < edit.length; i++) {
            edit[i].style.display = "none";
        };   
        var father_item = document.getElementById("childGroup-selected");
        var father = father_item.getAttribute("index"); //通过索引关联父子关系
        var newtodo = new ToDo(todo.length, edit[0].value, father, false, edit[1].value, edit[2].value);
        childGroup[father].child.push(todo.length);
        todo.push(newtodo);
        save();
        count();
        addGroup();
        error.innerHTML = "";
        edit[0].value = "";
        edit[1].value = "";
        edit[2].value = "";      
    }
}

//显示任务内容
function showToDo () {
    var j_todo = document.getElementsByClassName("j-todo");
    var show = document.getElementsByClassName("show");
    for (var i = 0; i < j_todo.length; i++) {
        j_todo[i].onclick = function(){
            for (var k = 0; k < j_todo.length; k++) {
                j_todo[k].removeAttribute("id");
            };
            this.setAttribute("id","todo-selected");
            var index = this.getAttribute("index");
            show[0].innerHTML = todo[index].name;
            show[1].innerHTML = todo[index].date;
            show[2].innerHTML = todo[index].text;
        }
    };
}

//删除节点
function del(e, ele) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();  // 阻止事件冒泡

    var con = confirm("确定要执行删除操作吗？");
    if (!con) {
        return;
    }

    var ele = ele.parentNode;
    var type = ele.getAttribute("class");

    //var index;
    //var name = ele.getElementsByTagName('span')[0].innerHTML;
    switch (type) {
        case "null":    // 删除一个父分组
            index = getIndexByKey(cate, 'name', name);

            for (var i = 0; i < cate[index].child.length; i++) {            // 删除该分类下的所有子分类及任务
                var childIndex = getIndexByKey(childCate, 'id', cate[index].child[i]);
                for (var j = 0; j < childCate[childIndex].child.length; j ++) {
                    var taskIndex = getIndexByKey(task, 'id', childCate[childIndex].child[j])
                    task.splice(taskIndex, 1);
                }
                childCate.splice(childIndex, 1);
            }
            cate.splice(index, 1);
            break;
        case "j-child-group":    // 删除一个子分类
            var index = ele.getAttribute("index");
            delChildGroup(index);
            break;
        case "j-todo":      //删除一个任务
            var index = ele.getAttribute("index");
            delToDo(index);
            break;
    }
    save();
    creatGroup();
}

function delToDo (index) {
    
    var len = todo.length-1;

    var fatherObj = childGroup[todo[index].father];  // 删除父节点中的记录
    fatherObj.child.splice(fatherObj.child.indexOf(todo[index].id), 1);
    
    todo.splice(index, 1);  //删除任务

    for (var i = Number(index); i < len; i++) {
        var id = todo[i].id;
        id--;
        var father = childGroup[todo[i].father];  // 修改父节点中的记录
        father.child.splice(father.child.indexOf(todo[i].id), 1, id);
        todo[i].id = id;    //修改剩余任务id值
    };
}

function delChildGroup (index) {
    
    var len = creatGroup.length-1;

    for (var i = 0; i < childGroup[index].child.length; i++) {
        delToDo (childGroup[index].child[i].id);
    };

    var fatherObj = group[childGroup[index].father];  // 删除父节点中的记录
    fatherObj.child.splice(fatherObj.child.indexOf(childGroup[index].id), 1);
    
    childGroup.splice(index, 1);    //删除子分类

    for (var i = Number(index); i < len; i++) {
        var id = childGroup[i].id;
        id--;
        var father = group[childGroup[i].father];  // 修改父节点中的记录
        father.child.splice(father.child.indexOf(childGroup[i].id), 1, id);
        childGroup[i].id = id;    //修改剩余子分类id值
        for (var j = 0; j < childGroup[i].child.length; j++) {
            childGroup[i].child[j].father = id;     //修改子分类下任务的father值
        };
    };
}