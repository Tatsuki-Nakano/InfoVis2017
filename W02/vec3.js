Vec3 = function(x,y,z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
}

Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

Vec3.prototype.min = function()
{
    var i = this.x
    if (i > this.y)
	i = this.y
    return 
