<?php
include '../database/database_conf.php';
$name = '%' . trim($_GET['name']) . '%';
$id= $_GET['id'];
$q= "select * from books where name like '$name' and id = $id";
$result = mysqli_query($connection,$q);
     $t = mysqli_fetch_assoc($result);
    if(mysqli_num_rows($result) == 0){
        echo '<script>
        swal("Not Found!","Book Not Found!","error");
        </script> ';
    }
    
?>
<script >
const n = document.querySelector(".name");
n.innerHTML = "<?php echo $t['name'];?>"

const s = document.querySelector(".nsection");
s.innerHTML = "<?php echo $t['Section'];?>"

const a = document.querySelector(".nauthor");
a.innerHTML = "<?php echo $t['author'];?>"

const p = document.querySelector(".npages");
p.innerHTML = "<?php echo $t['pages'];?>"

const i = document.querySelector(".bimage");
i.setAttribute("src","../upload/<?php echo $t['imgpath'];?>")

const x = document.querySelector(".icon-buy");
x.setAttribute("href","<?php echo $t['buylink'];?>")

const z = document.querySelector(".download");
z.setAttribute("href","../upload/<?php echo $t['pdfpath'];?>")

const rp = document.querySelector(".by");
rp.innerHTML = "<?php echo $t['user'];?>"


const l = document.querySelector(".text");
var out ="<?php 
 $o = str_replace(array(':', '-', '/', '*',',','/n'), '', $t['brief']);
 $t =preg_replace("/[\r\n]*/","",$o);
echo $t;?>";
l.innerHTML= out;
var lang = '<?= $_GET["lang"] ?>';

</script>

<?php 
mysqli_free_result($result);
mysqli_close($connection);
?>
