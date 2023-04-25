
// 1.Find all the information about each products
db.products.find().pretty();

// 2.Find the product price which are between 400 to 800
db.products.find({$and:[{"product_price":{$gte:400}},{"product_price":{$lte:800}}]}).pretty();

// 3.Find the product price which are not between 400 to 600
db.products.find({$or:[{"product_price":{$lte:400}},{"product_price":{$gte:600}}]}).pretty();

// 4.List the four product which are grater than 500 in price 
db.products.find( { "product_price":{ $gt: 500 } } ).limit(4).pretty();

// 5.Find the product name and product material of each products
db.products.find({},{product_name:1,product_material:1}).pretty();

// 6.Find the product with a row id of 10
db.products.find({id:"10"}).pretty();

// 7. only the product name and product material
db.products.find({},{product_name:1,product_material:1}).pretty();

// 8.Find all products which contain the value of soft in product material 
db.products.find({product_material:"Soft"}).pretty();

// 9.Find products which contain product color indigo  and product price 492.00
db.products.find({$and:[{product_color:"indigo"},{product_price:492}]}).pretty();

// 10.Delete the products which product price value are same
var duplicates = [];
db.products.aggregate([
{ $match: { product_price: { "$ne":'' } }},
{ $group:{ _id:{product_price:"$product_price"},
dups: { "$addToSet": "$_id" },
count: { "$sum":1 }}},
{$match: {count:{ "$gt":1 }}}],
{allowDiskUse:true}).forEach(function(doc) {
doc.dups.shift();
doc.dups.forEach( function(dupId){
duplicates.push(dupId);})})
printjson(duplicates);
db.products.remove({_id:{$in:duplicates}})