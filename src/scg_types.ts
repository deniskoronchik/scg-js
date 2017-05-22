import { Selection } from 'd3';

export type D3Selection = d3.Selection<any, any, any, any>;

// sc-element types
const sc_type_node                  = 0x1;
const sc_type_link                  = 0x2;
const sc_type_uedge_common          = 0x4;
const sc_type_dedge_common          = 0x8;
const sc_type_edge_access           = 0x10;

// sc-element constant
const sc_type_const                 = 0x20;
const sc_type_var                   = 0x40;

// sc-element positivity
const sc_type_edge_pos              = 0x80;
const sc_type_edge_neg              = 0x100;
const sc_type_edge_fuz              = 0x200;

// sc-element premanently
const sc_type_edge_temp             = 0x400;
const sc_type_edge_perm             = 0x800;

// struct node types
const sc_type_node_tuple            = 0x80;
const sc_type_node_struct           = 0x100;
const sc_type_node_role             = 0x200;
const sc_type_node_norole           = 0x400;
const sc_type_node_class            = 0x800;
const sc_type_node_abstract         = 0x1000;
const sc_type_node_material         = 0x2000;

const sc_type_arc_pos_const_perm    = (sc_type_edge_access | sc_type_const | sc_type_edge_pos | sc_type_edge_perm);
const sc_type_arc_pos_var_perm      = (sc_type_edge_access | sc_type_var | sc_type_edge_pos | sc_type_edge_perm);

// masks
const sc_type_element_mask          = (sc_type_node | sc_type_link | sc_type_uedge_common | sc_type_dedge_common | sc_type_edge_access);
const sc_type_constancy_mask        = (sc_type_const | sc_type_var);
const sc_type_positivity_mask       = (sc_type_edge_pos | sc_type_edge_neg | sc_type_edge_fuz)
const sc_type_permanency_mask       = (sc_type_edge_perm | sc_type_edge_temp)
const sc_type_node_struct_mask      = (sc_type_node_tuple | sc_type_node_struct | sc_type_node_role | sc_type_node_norole | sc_type_node_class | sc_type_node_abstract | sc_type_node_material)
const sc_type_edge_mask             = (sc_type_edge_access | sc_type_dedge_common | sc_type_uedge_common)


export class ScType {
    protected _value: number;

    constructor(v?: number) {
        this._value = v ? v : 0;
    }

    public getValue() : number {
        return this._value;
    }

    public hasConstancy() : boolean {
        return (this._value & sc_type_constancy_mask) != 0;
    }

    public hasDirection() : boolean {
        return (this._value & sc_type_uedge_common) == 0;
    }

    public isNode() : boolean {
        return (this._value & sc_type_node) != 0;
    }

    public isEdge() : boolean {
        return (this._value & sc_type_edge_mask) != 0;
    }

    public isLink() : boolean {
        return (this._value & sc_type_link) != 0;
    }

    public isConst() : boolean {
        return (this._value & sc_type_const) != 0;
    }

    public isVar() : boolean {
        return (this._value & sc_type_var) != 0;
    }

    public isPos() : boolean {
        return (this._value & sc_type_edge_pos) != 0;
    }

    public isNeg() : boolean {
        return (this._value & sc_type_edge_neg) != 0;
    }

    public isFuz() : boolean {
        return (this._value & sc_type_edge_fuz) != 0;
    }

    public isPerm() : boolean {
        return (this._value & sc_type_edge_perm) != 0;
    }

    public isTemp() : boolean {
        return (this._value & sc_type_edge_temp) != 0;
    }

    public isAccess() : boolean {
        return (this._value & sc_type_edge_access) != 0;
    }

    public isTuple() : boolean {
        return (this._value & sc_type_node_tuple) != 0;
    }
    public isStruct() : boolean {
        return (this._value & sc_type_node_struct) != 0;
    }

    public isRole() : boolean {
        return (this._value & sc_type_node_role) != 0;
    }

    public isNoRole() : boolean {
        return (this._value & sc_type_node_norole) != 0;
    }

    public isClass() : boolean {
        return (this._value & sc_type_node_class) != 0;
    }

    public isAbstract() : boolean {
        return (this._value & sc_type_node_abstract) != 0;
    }
    
    public isMaterial() : boolean {
        return (this._value & sc_type_node_material) != 0;
    }

    public equal(other: ScType) : boolean {
        return (this._value === other._value);
    }

    static readonly EdgeUCommon = new ScType(sc_type_uedge_common);
    static readonly EdgeDCommon = new ScType(sc_type_dedge_common);

    static readonly EdgeUCommonConst = new ScType(sc_type_uedge_common | sc_type_const);
    static readonly EdgeDCommonConst = new ScType(sc_type_dedge_common | sc_type_const);
    static readonly EdgeUCommonVar = new ScType(sc_type_uedge_common | sc_type_var);
    static readonly EdgeDCommonVar = new ScType(sc_type_dedge_common | sc_type_var);

    static readonly EdgeAccess = new ScType(sc_type_edge_access);
    static readonly EdgeAccessConstPosPerm = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_pos);
    static readonly EdgeAccessConstNegPerm = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_neg);
    static readonly EdgeAccessConstFuzPerm = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_fuz);
    static readonly EdgeAccessConstPosTemp = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_pos);
    static readonly EdgeAccessConstNegTemp = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_neg);
    static readonly EdgeAccessConstFuzTemp = new ScType(sc_type_const | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_fuz);

    static readonly EdgeAccessVarPosPerm = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_pos);
    static readonly EdgeAccessVarNegPerm = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_neg);
    static readonly EdgeAccessVarFuzPerm = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_perm | sc_type_edge_fuz);
    static readonly EdgeAccessVarPosTemp = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_pos);
    static readonly EdgeAccessVarNegTemp = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_neg);
    static readonly EdgeAccessVarFuzTemp = new ScType(sc_type_var | sc_type_edge_access | sc_type_edge_temp | sc_type_edge_fuz);

    static readonly Const = new ScType(sc_type_const);
    static readonly Var = new ScType(sc_type_var);

    static readonly Node = new ScType(sc_type_node);
    static readonly Link = new ScType(sc_type_link);
    static readonly Unknown = new ScType();

    static readonly NodeConst = new ScType(sc_type_node | sc_type_const);
    static readonly NodeVar = new ScType(sc_type_node | sc_type_var);

    static readonly LinkConst = new ScType(sc_type_link | sc_type_const);
    static readonly LinkVar = new ScType(sc_type_link | sc_type_var);

    static readonly NodeConstStruct = new ScType(sc_type_node | sc_type_const | sc_type_node_struct);
    static readonly NodeConstTuple = new ScType(sc_type_node | sc_type_const | sc_type_node_tuple);
    static readonly NodeConstRole = new ScType(sc_type_node | sc_type_const | sc_type_node_role);
    static readonly NodeConstNoRole = new ScType(sc_type_node | sc_type_const | sc_type_node_norole);
    static readonly NodeConstClass = new ScType(sc_type_node | sc_type_const | sc_type_node_class);
    static readonly NodeConstAbstract = new ScType(sc_type_node | sc_type_const | sc_type_node_abstract);
    static readonly NodeConstMaterial = new ScType(sc_type_node | sc_type_const | sc_type_node_material);

    static readonly NodeVarStruct = new ScType(sc_type_node | sc_type_var | sc_type_node_struct);
    static readonly NodeVarTuple = new ScType(sc_type_node | sc_type_var | sc_type_node_tuple);
    static readonly NodeVarRole = new ScType(sc_type_node | sc_type_var | sc_type_node_role);
    static readonly NodeVarNoRole = new ScType(sc_type_node | sc_type_var | sc_type_node_norole);
    static readonly NodeVarClass = new ScType(sc_type_node | sc_type_var | sc_type_node_class);
    static readonly NodeVarAbstract = new ScType(sc_type_node | sc_type_var | sc_type_node_abstract);
    static readonly NodeVarMaterial = new ScType(sc_type_node | sc_type_var | sc_type_node_material);
};