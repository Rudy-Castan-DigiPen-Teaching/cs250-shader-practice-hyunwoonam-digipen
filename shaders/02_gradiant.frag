#version 300 es
precision mediump float;

#define PI 3.14159265359

/**
 * \file
 * \author HyunWoo Nam
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.1412, 0.7725, 0.9137);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}



out vec4 FragColor;

float easeOutBounce(float x) {
  float n1 = 7.5625;
  float d1 = 2.75;

  if (x < (1.0 / d1)) {
    return n1 * x * x;
  } else if (x < 2.0 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

float easeInOutBounce2(float x) {
return x < 0.5
  ? (1.0 - easeOutBounce(1.0 - 2.0 * x)) / 2.0
  : (1.0 + easeOutBounce(2.0 * x - 1.0)) / 2.0;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

     pct.r = smoothstep(1.0,0.1, st.x);
     pct.g = easeOutBounce(st.x);
     pct.b = easeInOutBounce2(st.x);

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    FragColor = vec4(color,1.0);
}