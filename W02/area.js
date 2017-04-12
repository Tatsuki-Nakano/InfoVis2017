function AreaOfTriangle(v0,v1,v2)
{
    var ax = v0.x-v1.x
    var ay = v0.y-v1.y
    var az = v0.z-v1.z
    var bx = v2.x-v1.x
    var by = v2.y-v1.y
    var bz = v2.z-v1.z
    return Math.sqrt(Math.pow(ay*bz-az*by,2)+Math.pow(az*bx-ax*bz,2)+Math.pow(ax*by-ay*bx,2))*0.5;
}
