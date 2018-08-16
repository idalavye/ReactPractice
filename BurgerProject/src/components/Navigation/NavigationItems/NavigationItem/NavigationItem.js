import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            exact={props.exact}
            to={props.link}
            activeClassName={classes.active}
        >{props.children}</NavLink>
    </li>
);

export default navigationItem;

/**
 * aktif class ismi vermemize gerek yok bnu otomatikmen belirleyecektir
 * 
 * <NavLink
            href={props.link}
            className={props.active ? classes.active : null}
        >{props.children}</NavLink>
 */

 /**
  * NavLink runtime da otomatikmen active isminde bir class arar ve eşleştirmeye çalışır. Ama biz bu 
  * projede css module kullandığımız için bizim yazdığımız class isimleriimizin herbiri runtime da 
  * unique bir şekilde isimlendirilerek kullanılır. Bu yüzden Navlink active classımızla eşlemez.   
  */